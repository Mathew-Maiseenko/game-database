export function saveIsUserSignedInLocalStorage(isSigned: boolean) {
	localStorage.setItem('isUserSigned', isSigned ? '1' : '')
}
