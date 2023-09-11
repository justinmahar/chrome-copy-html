/** Show a toast message in the upper right corner */
declare const showToast: (message: string) => void;
/** Copy the provided text to the clipboard, and show a toast message with the results. */
declare const copy: (text: string) => void;
/** Copy the document HTML to the clipboard. */
declare const copyHtml: () => void;
