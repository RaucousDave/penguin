import React from 'react';
import TypingText from './TypingText.tsx'

interface ChapterProps{
	title: string;
	content:string;
}
const Chapter = ({title, content}: ChapterProps) => {
	return(
		<div className='flex flex-col justify-center items-center mb-6 gap-2 px-3'>
			<h1 className='text-4xl font-heading font-semibold mb-2 text-purple-800 text-center'>{title}</h1>
			 <TypingText text={content}/> 
		</div>
		)
}


export default Chapter