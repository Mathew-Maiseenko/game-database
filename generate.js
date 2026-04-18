/**
 * Алгоритм FIPS-186 генерации псевдослучайной последовательности
 * (с использованием SHA-1 в качестве функции G)
 *
 * @param {number} m - количество генерируемых чисел x_i
 * @param {bigint} q - 160-битное простое число (модуль)
 * @param {number} [b=160] - разрядность параметра s и y_i (160 ≤ b ≤ 512)
 * @returns {bigint[]} массив m чисел x_i в диапазоне [0, q-1]
 */
function fips186Generate(m, q, b = 160) {
	// Константа t (стандартное начальное состояние SHA-1)
	const t = 0x67452301efcdab8998badcfe10325476c3d2e1f0n

	// Генерация случайного секретного начального значения s (b бит)
	const byteLength = Math.ceil(b / 8)
	const randomBytes = new Uint8Array(byteLength)
	crypto.getRandomValues(randomBytes)
	let s = 0n
	for (let i = 0; i < byteLength; i++) {
		s = (s << 8n) | BigInt(randomBytes[i])
	}
	// Обрезаем до b бит (если b не кратно 8)
	const mask = (1n << BigInt(b)) - 1n
	s &= mask

	const result = []
	const twoPowB = 1n << BigInt(b) // 2^b

	for (let i = 0; i < m; i++) {
		// 1) y_i = 0 (можно задать произвольно)
		const y = 0n

		// 2) z_i = (s + y_i) mod 2^b
		const z = (s + y) & mask

		// 3) x_i = G(t, z) mod q
		const Gval = G(t, z, b)
		const x = Gval % q

		// 4) s = (1 + s + x_i) mod 2^b
		s = (1n + s + x) & mask

		result.push(x)
	}

	return result
}

/**
 * Функция G(t, c) согласно описанию:
 * - t разбивается на 5 32-битных слов H0..H4
 * - c дополняется нулями до 512 бит
 * - выполняется один блок SHA-1 с начальным состоянием H0..H4
 * - результат конкатенируется в 160-битное слово
 *
 * @param {bigint} t - 160-битное слово
 * @param {bigint} c - b-битное слово
 * @param {number} b - исходная разрядность c
 * @returns {bigint} 160-битное значение G(t, c)
 */
function G(t, c, b) {
	// Разбиваем t на пять 32-битных слов (BigInt)
	const H = [
		(t >> 128n) & 0xffffffffn,
		(t >> 96n) & 0xffffffffn,
		(t >> 64n) & 0xffffffffn,
		(t >> 32n) & 0xffffffffn,
		t & 0xffffffffn,
	]

	// Дополняем c нулями до 512 бит: M = c || 0^(512-b)
	const M_512 = c << BigInt(512 - b)

	// Разбиваем M_512 на 16 слов по 32 бита (от старшего к младшему)
	const M = new Array(16)
	for (let i = 0; i < 16; i++) {
		M[i] = (M_512 >> BigInt(512 - 32 * (i + 1))) & 0xffffffffn
	}

	// Обработка одного блока SHA-1
	const newH = sha1ProcessBlock(H, M)

	// Конкатенация результата: H0 || H1 || H2 || H3 || H4
	return (
		(newH[0] << 128n) |
		(newH[1] << 96n) |
		(newH[2] << 64n) |
		(newH[3] << 32n) |
		newH[4]
	)
}

/**
 * Обработка одного 512-битного блока алгоритмом SHA-1
 * с заданным начальным состоянием H (5 слов).
 *
 * @param {bigint[]} H - начальные значения (5 элементов, 32 бита каждый)
 * @param {bigint[]} M - 16 слов сообщения по 32 бита
 * @returns {bigint[]} новые значения H после обработки блока
 */
function sha1ProcessBlock(H, M) {
	// Копируем начальное состояние
	let [a, b, c, d, e] = H

	// Расширение сообщения: W[0..15] = M[0..15], затем для t=16..79
	const W = new Array(80)
	for (let t = 0; t < 16; t++) {
		W[t] = M[t]
	}
	for (let t = 16; t < 80; t++) {
		const val = W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16]
		W[t] = leftRotate32(val, 1)
	}

	// Основной цикл (80 раундов)
	for (let t = 0; t < 80; t++) {
		let K, f
		if (t < 20) {
			f = (b & c) | (~b & d)
			K = 0x5a827999n
		} else if (t < 40) {
			f = b ^ c ^ d
			K = 0x6ed9eba1n
		} else if (t < 60) {
			f = (b & c) | (b & d) | (c & d)
			K = 0x8f1bbcdcn
		} else {
			f = b ^ c ^ d
			K = 0xca62c1d6n
		}

		const temp = (leftRotate32(a, 5) + f + e + W[t] + K) & 0xffffffffn
		e = d
		d = c
		c = leftRotate32(b, 30)
		b = a
		a = temp
	}

	// Добавляем к исходному состоянию
	return [
		(H[0] + a) & 0xffffffffn,
		(H[1] + b) & 0xffffffffn,
		(H[2] + c) & 0xffffffffn,
		(H[3] + d) & 0xffffffffn,
		(H[4] + e) & 0xffffffffn,
	]
}

/**
 * Циклический сдвиг 32-битного BigInt влево на n бит.
 */
function leftRotate32(x, n) {
	return ((x << BigInt(n)) | (x >> BigInt(32 - n))) & 0xffffffffn
}

// --------------------------------------------------------------
// Генерация бинарной последовательности из 200 символов
// --------------------------------------------------------------

// Параметры (можно заменить на свои)
//const q = 0xb20db0b101df0c6624fc1392ba55f77d577481e5n; // 160-битное простое из примера FIPS 186-2
const q = 749268649756999958693827924178799074166890120647n
const bitsNeeded = 200 // ← Требуемая длина в битах
const bitsPerNumber = 160 // каждое x_i даёт 160 бит
const m = Math.ceil(bitsNeeded / bitsPerNumber) // сколько чисел сгенерировать

const randomNumbers = fips186Generate(m, q, 160)

// Преобразуем каждое число в 160-битную строку с ведущими нулями
let binaryString = ''
for (const x of randomNumbers) {
	binaryString += x.toString(2).padStart(160, '0')
}
// Обрезаем до нужной длины
binaryString = binaryString.slice(0, bitsNeeded)

console.log('160-битное число q:', q.toString(2).split('').join(' '))
console.log('Требуемая длина последовательности:', binaryString.length)
// console.log('Сгенерированные числа:', randomNumbers)
console.log(
	'Сгенерированная последовательность :',
	binaryString.split('').join(' '),
)

const res = `160-битное число q: 1 0 0 0 0 0 1 1 0 0 1 1 1 1 1 0 0 1 0 1 1 1 1 0 0 1 0 0 0 1 1 0 1 0 0 1 1 0 0 0 0 0 0 0 1 1 1 1 1 1 0 1 0 0 1 0 1 0 1 0 1 0 0 0 0 1 0 1 0 1 1 1 1 0 0 1 0 0 0 0 1 1 0 1 1 1 1 0 1 0 0 1 0 0 0 1 1 1 0 1 1 1 0 1 0 1 1 1 1 1 1 1 1 0 1 1 0 1 0 1 1 0 1 1 1 0 1 1 0 0 1 0 1 0 1 0 1 0 1 1 0 1 0 1 0 1 0 0 0 1 0 1 1 1 0 0 0 1 1 1
Требуемая длина последовательности: 200
Сгенерированная последовательность : 0 0 1 1 0 0 1 0 1 1 1 0 0 0 1 0 1 0 1 0 1 0 1 1 1 1 0 0 0 1 1 1 0 0 0 1 0 1 0 1 1 0 1 0 1 0 0 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 1 1 1 1 1 1 0 1 1 0 0 0 0 1 1 1 1 0 0 1 1 1 1 0 0 1 0 1 0 1 1 1 1 0 1 1 1 1 0 0 1 0 1 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 1 0 1 1 0 0 0 0 0 0 0 1 1 0 0 1 0 0 1 0 0 0 0 0 1 1 1 0 1 0 1 1 1 0 1 0 0 0 1 0 0 0 1 1 1 1 1 0 1 1 0 1 0 1 0 1 0 1 0 0 1 1 0 1 0 1 0 0 0 1 1 0 1 0 1 1 0 0 0`
