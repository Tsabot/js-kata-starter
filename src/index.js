

const maxNumberOfStar = 9;

const main = () => {
    let numberOfRow = 0;
    const maxNumberOfRow = maxNumberOfStar || 1;
    let baseNumberOfSpace = Math.floor(maxNumberOfStar / 2)

    while (numberOfRow < maxNumberOfRow) {
        numberOfRow += 1;
        let stringToDisplay = "";

        for (let index = 0; index < maxNumberOfStar; index++) {
            const starOrSpace = index < baseNumberOfSpace || index >= maxNumberOfStar - baseNumberOfSpace ? ' ' : '*';

            stringToDisplay += starOrSpace;
        }

        console.log(stringToDisplay);

        if (numberOfRow > maxNumberOfRow / 2) {
            baseNumberOfSpace += 1;
        } else {
            baseNumberOfSpace -= 1;
        }
    }
}

main()