{
    const screenElement = document.querySelector(".screen");
    const scoresElement = document.querySelector(".scores > span");
    const buttonElement = document.querySelector(".buttons");
    const pauseElement = document.querySelector(".paused");
    const rect = screenElement.getBoundingClientRect();
    const autoWidth = rect.width / 3;
    const autoHeight = rect.height / 4;
    const positionLeft = 0;
    const positionCenter = autoWidth;
    const positionRight = autoWidth + autoWidth;
    const autoPositionX = [
        [positionLeft],
        [positionCenter],
        [positionRight],
        [positionLeft, positionCenter],
        [positionCenter, positionRight],
        [positionLeft, positionRight]
    ];
    const autoPositionY = -autoHeight;
    const autoPositionsY = [
        autoPositionY,
        autoPositionY * 1.5,
        autoPositionY * 2,
        autoPositionY * 2.5,
    ];
    const autoImages = [
        "./2-auto.png",
        "./3-auto.png",
        "./4-auto.png",
        "./5-auto.png",
        "./6-auto.png",
        "./7-auto.png",
    ];
    const pilotLeft = positionCenter;
    const pilotTop = rect.height - autoHeight;
    const pilotImage = "./1-pilot.png";
    const linePositionMargin = rect.height / 5;
    const randomInArray = (array) => array[Math.floor(Math.random() * array.length)];
    const createAuto = (left, top, img) => {
        const element = document.createElement("div");

        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.backgroundImage = `url(${img})`;
        element.setAttribute("class", "auto");

        return element;
    };
    const createLine = (top) => {
        const element = document.createElement("div");
        element.style.top = `${top}px`;
        element.setAttribute("class", "line");

        return element;
    };
    const getAutos = () => randomInArray(autoPositionX).map(positionX => createAuto(positionX, randomInArray(autoPositionsY), randomInArray(autoImages)));
    const getLines = () => Array.from({ length: 6 }, (_, index) => createLine(linePositionMargin * (--index)));
    let stage = 5;
    let delta = 1;
    let interval = null;
    let autos = [];
    let lines = [];
    let pilot = createAuto(pilotLeft, pilotTop, pilotImage);
    let started = false;

    const animateAutos = () => {
        for (const auto of autos) {
            const autoTop = parseFloat(auto.style.top);
            const autoBottom = autoTop + autoHeight;

            if (parseFloat(pilot.style.top) <= autoBottom && parseFloat(pilot.style.left) === parseFloat(auto.style.left)) {
                const message = `Game over!\nYou scores ${scoresElement.innerHTML}!`;

                reset();
                alert(message);
            } else {
                if (autoTop >= rect.height) {
                    scoresElement.innerHTML = (parseInt(scoresElement.innerHTML, 10) + 100).toString();
                    stage += 0.0005;

                    const index = autos.indexOf(auto);

                    auto.remove();
                    autos.splice(index, 1);
                } else {
                    auto.style.top = `${autoTop + (stage + delta)}px`;
                }
            }
        }

        if (!autos.length) {
            autos = getAutos();
            autos.forEach(auto => screenElement.append(auto));
        }
    };
    const animateLines = () => {
        for (const line of lines) {
            const lineTop = parseFloat(line.style.top) + stage + (delta + 2);

            line.style.top = lineTop >= rect.height ? `${-linePositionMargin}px` : `${lineTop}px`;
        }
    };
    const animate = () => {
        animateAutos();
        animateLines();
    };
    const reset = () => {
        clearInterval(interval);
        pilot.remove();
        pilot = createAuto(pilotLeft, pilotTop, pilotImage);
        screenElement.append(pilot);

        autos.forEach(auto => auto.remove());
        autos = getAutos();
        autos.forEach(auto => screenElement.append(auto));

        lines.forEach(line => line.remove());
        lines = getLines();
        lines.forEach(line => screenElement.append(line));

        stage = 0;
        interval = null;
        started = false;

        scoresElement.innerHTML = '0';
        pauseElement.style.display = "none";
    };
    const start = () => {
        started = true;
        interval = setInterval(animate, 10);
    };
    const pause = () => {
        if (!started) {
            return;
        }

        if (interval) {
            clearInterval(interval);
            interval = null;
            pauseElement.style.display = "block";
        } else {
            pauseElement.style.display = "none";
            start();
        }
    };
    const handleKeydown = (event) => {
        const left = parseFloat(pilot.style.left);

        if (event.key === "ArrowRight" && (left < positionRight)) {
            pilot.style.left = `${left + autoWidth}px`;
        }

        if (event.key === "ArrowLeft" && (left > positionLeft)) {
            pilot.style.left = `${left - autoWidth}px`;
        }

        if (event.key === "ArrowUp") {
            delta = 10;
        }

        if (event.key.toLowerCase() === "s") {
            reset();
            start();
        }

        if (event.key.toLowerCase() === "p") {
            pause();
        }

        if (event.key.toLowerCase() === "r") {
            reset();
        }
    };
    const handleKeyup = (event) => {
        if (event.key === "ArrowUp") {
            delta = 1;
        }
    };
    const handleClick = (event) => {
        if (event.target.id === "start") {
            reset();
            start();
        }

        if (event.target.id === "pause") {
            pause();
        }

        if (event.target.id === "reset") {
            reset();
        }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
    buttonElement.addEventListener("click", handleClick);

    reset();
}
