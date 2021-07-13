

const maxNumberOfStar = 9;

const initVar = () => {
    let numberOfRow = 0;
    const maxNumberOfRow = maxNumberOfStar || 1;
    let baseNumberOfSpace = Math.floor(maxNumberOfStar / 2)

    return {numberOfRow, maxNumberOfRow, baseNumberOfSpace}
}

const isStarOrSpace = (index, baseNumberOfSpace, maxNumberOfStar) => {
    return index < baseNumberOfSpace || index >= maxNumberOfStar - baseNumberOfSpace ? ' ' : '*'
}
 
const main = () => {
    let {numberOfRow, maxNumberOfRow, baseNumberOfSpace} = initVar()

    while (numberOfRow < maxNumberOfRow) {
        numberOfRow += 1;
        let stringToDisplay = "";

        for (let index = 0; index < maxNumberOfStar; index++) {
            const starOrSpace = isStarOrSpace(index, baseNumberOfSpace, maxNumberOfStar);

            stringToDisplay += starOrSpace;
        }

        console.log(stringToDisplay);

        baseNumberOfSpace += numberOfRow > maxNumberOfRow / 2 ?  1 : -1;
    }
}

main()