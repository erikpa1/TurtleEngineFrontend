export default class TurtleRandom {

    static GetRandomFromZero(toIndex: number) {
        const randomIndex = Math.floor(Math.random() * toIndex);
        return randomIndex
    }

}