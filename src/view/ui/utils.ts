import { NextRouter } from 'next/router.js';
import { FormEvent } from 'react';

export function submitForm(
  router: NextRouter,
  callback?: (pending: boolean) => void,
) {
  return async (e: FormEvent<HTMLFormElement>): Promise<string | undefined> => {
    if (callback) callback(true);
    if (!window.fetch) return;
    e.preventDefault();
    const form = e.currentTarget;
    const { action, method } = form;
    const params = new URLSearchParams(
      new FormData(form) as unknown as Record<string, string>,
    );
    const url = method == 'post' ? action : `${action}?${params.toString()}`;
    let res: Response;
    try {
      res = await fetch(
        url,
        method == 'post' ? { method, body: params } : undefined,
      );
      if (!res.ok)
        throw new Error('Form submission failed', { cause: await res.json() });
    } catch (err) {
      if (callback) callback(false);
      throw err;
    }
    void router.push(res.url);
    return res.url;
  };
}
