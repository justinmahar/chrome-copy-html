/** Show a notification in the upper right corner */
declare const showNotification: (message: string) => void;
/** Copy the provided text to the clipboard, and show a notification with the results. */
declare const copy: (text: string) => void;
/** Copy the document HTML to the clipboard. */
declare const copyHtml: () => void;
