import { useCallback, useEffect, useRef, useState } from "react";

function useRecaptcha(siteKey: string) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src*="recaptcha/api.js?render=${siteKey}"]`,
    );

    if (existingScript) {
      (function () {
        setIsLoaded(true);
      })();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.log("Error loading the recaptcha");
    };

    document.head.appendChild(script);
    scriptRef.current = script;
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!isLoaded || !window.grecaptcha) {
        console.log("Recaptcha not loaded yet");
        return null;
      }

      return new Promise((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(siteKey, { action });
            resolve(token);
          } catch (error) {
            console.log("Failed to load recaptcha", error);
            resolve(null);
          }
        });
      });
    },
    [siteKey, isLoaded],
  );

  return { isLoaded, executeRecaptcha };
}

export default useRecaptcha;
