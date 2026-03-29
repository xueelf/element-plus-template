const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? 'Untitled';

export function getAppTitle() {
  return APP_TITLE;
}

export function getPageTitle(pageTitle?: string) {
  if (pageTitle) {
    return `${pageTitle} | ${APP_TITLE}`;
  }
  return APP_TITLE;
}
