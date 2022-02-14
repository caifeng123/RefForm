export const getData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stationDesignedG1: "1weq",
        stationDesignedG4: [
          {
            name: "axcvvf",
            "@type": "integer",
            required: false
          },
          {
            name: "fields_2",
            "@type": "long",
            required: true
          }
        ]
      });
    }, 1000);
  });
