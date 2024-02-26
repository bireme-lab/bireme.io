import { useEffect } from "react";

type Params = {
  enabled: boolean;
  language: string;
};

let scriptInjected = false;

function createScriptElement(language: string): HTMLScriptElement {
  const element = document.createElement("script");
  element.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}&hl=${language}`;
  return element;
}

function injectScript(element: HTMLScriptElement): void {
  document.body.appendChild(element);
}

export function useGoogleReCaptcha({ language, enabled }: Params): {
  executeRecaptcha: (action: string) => Promise<string>;
} {
  const executeRecaptcha = async (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // @ts-expect-error - grecaptcha is a global variable
      window.grecaptcha?.ready(() => {
        // @ts-expect-error - grecaptcha is a global variable
        window.grecaptcha
          ?.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  useEffect(() => {
    if (enabled && !scriptInjected) {
      const script = createScriptElement(language);
      injectScript(script);
      scriptInjected = true;
    }
  }, [enabled]);

  return {
    executeRecaptcha,
  };
}
