const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

export const getApiBaseUrl = () => {
  const envBaseUrl = process.env.REACT_APP_API_BASE_URL;
  if (envBaseUrl && envBaseUrl.trim()) {
    return trimTrailingSlash(envBaseUrl.trim());
  }

  const { protocol, hostname } = window.location;
  const codespaceMatch = hostname.match(/^(.*)-3000\.app\.github\.dev$/);
  if (codespaceMatch && codespaceMatch[1]) {
    return `${protocol}//${codespaceMatch[1]}-8000.app.github.dev`;
  }

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//localhost:8000`;
  }

  return `${protocol}//${hostname}:8000`;
};
