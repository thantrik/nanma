function scrollScreen() {
  let lastScrollHeight = 0;
  const viewHeight = window.innerHeight;
  const totalHeight = window.document.body.scrollHeight;
  const viewCount = Math.ceil(totalHeight / viewHeight);

  let blockCount = 0;
  const X = 0;
  let Y = 0;

  while (blockCount < viewCount) {
    Y += window.innerHeight;
    lastScrollHeight = window.scrollY;
    console.log(X, Y);
    window.scrollTo(0, Y);
    blockCount++;
    //totalHeight / window.scrollTo(0, window.scrollY + window.innerHeight);
  }

  return {
    lastScrollY: lastScrollHeight,
    viewHeight: viewHeight,
    viewCount: viewCount,
  };
}
scrollScreen();
