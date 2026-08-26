declare global {
  interface Window {
    grecaptcha: Grecaptcha;
  }
}
interface Grecaptcha {
  ready(callback: () => void): void;
  execute(
    siteKey: string,
    options: {
      action: string;
    },
  ): Promise<string>;
}
