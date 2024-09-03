import Image from 'next/image'
// import downloadSwg from '../../../../public/downloadIcon.svg'
import classes from './style.module.css'
interface HoverIconWithTextProps {
	title: string
	image: string
	alt: string
}
export function HoverIconWithText({
	title,
	image,
	alt,
}: HoverIconWithTextProps) {
	return (
		<div className={`${classes.icon} ${classes.facebook} icon facebook`}>
			<div className={`${classes.tooltip} tooltip`}>{title}</div>
			<span>
				<Image
					src={image}
					width={20}
					height={20}
					className={`${classes.image}`}
					alt={alt}
				/>
			</span>
		</div>
	)
}

/*
<i class='fab fa-facebook-f'></i>


		<article className={classes.icon}>
			<span>Facebook</span>
		</article>

      <div class="wrapper">
         <div class="icon facebook">
            <div class="tooltip">
               Facebook
            </div>
            <span><i class="fab fa-facebook-f"></i></span>
         </div>
         <div class="icon twitter">
            <div class="tooltip">
               Twitter
            </div>
            <span><i class="fab fa-twitter"></i></span>
         </div>
         <div class="icon instagram">
            <div class="tooltip">
               Instagram
            </div>
            <span><i class="fab fa-instagram"></i></span>
         </div>
         <div class="icon github">
            <div class="tooltip">
               Github
            </div>
            <span><i class="fab fa-github"></i></span>
         </div>
         <div class="icon youtube">
            <div class="tooltip">
               YouTube
            </div>
            <span><i class="fab fa-youtube"></i></span>
         </div>
      </div>
*/
