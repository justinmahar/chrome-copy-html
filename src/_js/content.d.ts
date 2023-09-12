/** Show a notification in the upper right corner */
declare const showNotification: (message: string) => void;
declare const successMessage = "\u2705 HTML Copied!";
declare const failureMessage = "\u274C Failed to copy";
/** Copy the provided text to the clipboard, and show a notification with the results. */
declare const copy: (text: string, legacy?: boolean) => void;
/** Copy the document HTML to the clipboard. */
declare const copyHtml: (legacy?: boolean) => void;
declare const legacyCopy: (text: string) => void;
