const SECTION_ORDER = ['01-fundamentals', '02-data-structures', '03-algorithms'];
const SECTION_LABELS = {
  '01-fundamentals': 'Fundamentals',
  '02-data-structures': 'Data Structures',
  '03-algorithms': 'Algorithms',
};

function toTitleCase(value) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function getSectionId(relativePath) {
  return relativePath.split('/')[0];
}

function getSectionLabel(sectionId) {
  return SECTION_LABELS[sectionId] ?? toTitleCase(sectionId);
}

function getLessonId(relativePath) {
  return relativePath.replace(/\.md$/, '').replace(/\.js$/, '');
}

function getLessonRoute(relativePath) {
  return `/learn/${getLessonId(relativePath)}`;
}

function getSectionRoute(sectionId) {
  return `/learn/${sectionId}`;
}

export {
  SECTION_LABELS,
  SECTION_ORDER,
  getLessonId,
  getLessonRoute,
  getSectionId,
  getSectionLabel,
  getSectionRoute,
  toTitleCase,
};
