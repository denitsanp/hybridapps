function figureArea([w, h, W, H]){
    let fig1Area = Number(w) * Number(h);
    let fig2Area = Number(W) * Number(H);

    let commonArea = Math.min(Number(w), Number(W)) * Math.min(Number(h), Number(H));

    let figureArea = fig1Area + fig2Area - commonArea;

    console.log(figureArea);
}
figureArea(['2', '4', '5', '3']);