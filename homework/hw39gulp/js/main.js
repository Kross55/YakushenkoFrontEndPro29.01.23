$(() => {
  $("body").css("background", "blue");
});

const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah",
  },
};
const dogName = adventurer.dog?.name;
// eslint-disable-next-line no-console
console.log(dogName);
// Expected output: undefined
// eslint-disable-next-line no-console
console.log(adventurer.someNonExistentMethod?.());
// Expected output: undefined
