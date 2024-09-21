import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import TurndownService from "turndown";

/**
 * converts markdown content into html
 * sanitize html with allowed tags
 * converts sanitized html back to markdown
 */
export default function sanitizedMarkdown(markdownContent: string) {
	const turndownService = new TurndownService();
	const htmlContent = marked.parse(markdownContent) as string;

	const sanitizedHtmlContent = sanitizeHtml(htmlContent, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
	});

	return turndownService.turndown(sanitizedHtmlContent);
}
