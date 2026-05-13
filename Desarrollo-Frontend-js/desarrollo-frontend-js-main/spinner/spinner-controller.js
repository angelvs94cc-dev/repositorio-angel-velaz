import { buildSpinner } from "./spinner-view.js"

export const spinnerController = (spinnerContainer) => {

  const showSpinner = () => {
    const spinner = buildSpinner();
    spinnerContainer.innerHTML = spinner;
  }

  const hideSpinner = () => {
    spinnerContainer.innerHTML = ''
  }

  return {
    showSpinner,
    hideSpinner
  };
}

