export type ResGlobal = {
  total: number;
};

const loader = async (): Promise<ResGlobal | null> => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const res = await fetch(`https://camp-api.deco.cx/events`, {
      mode: 'no-cors',
      signal,
      headers: {
        "x-api-key": "decocampalmeida",
      },
    });

    if (!res.ok) {
      console.log('Error:', res.statusText);
      return null;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const response = await res.json();
      return response;
    } else {
      return null;
    }

  } catch (err) {
    console.log('Error:', err);
    return null;
  }
};

export default loader;
