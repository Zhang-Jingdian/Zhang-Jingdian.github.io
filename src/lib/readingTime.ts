/**
 * 计算文章的阅读时间
 * @param content - 文章内容（HTML 或纯文本）
 * @returns 预计阅读时间（分钟）
 */
export function calculateReadingTime(content: string): number {
	// 移除 HTML 标签
	const text = content.replace(/<[^>]*>/g, '');
	
	// 计算中文字符数（包括中文标点）
	const chineseChars = text.match(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g) || [];
	const chineseCount = chineseChars.length;
	
	// 计算英文单词数
	const englishWords = text.match(/[a-zA-Z]+/g) || [];
	const englishCount = englishWords.length;
	
	// 中文阅读速度：约 300-500 字/分钟，取中间值 400
	// 英文阅读速度：约 200-250 词/分钟，取中间值 225
	const chineseReadingSpeed = 400;
	const englishReadingSpeed = 225;
	
	const readingTimeMinutes = 
		(chineseCount / chineseReadingSpeed) + 
		(englishCount / englishReadingSpeed);
	
	// 至少显示 1 分钟
	return Math.max(1, Math.ceil(readingTimeMinutes));
}

/**
 * 格式化阅读时间显示
 * @param minutes - 阅读时间（分钟）
 * @returns 格式化后的字符串
 */
export function formatReadingTime(minutes: number): string {
	if (minutes < 1) return '1 分钟';
	return `${minutes} 分钟`;
}
