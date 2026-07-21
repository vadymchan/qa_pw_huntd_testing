export const formatCamelCaseToPhrase = (text: string) =>
  text.replace(/[A-Z]/g, (match) => ' ' + match);

export const formatKebabCaseToPhrase = (text: string) => text.replace(/[-]+/g, ' ');

export const formatPhraseToTitleCase = (text: string) =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());
