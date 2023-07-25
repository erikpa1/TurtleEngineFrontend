export default class TurtleArrays {

    static SwapElementsInDirection(array, elementIndex, direction) {
        // Check if the element is the last element.
        const indexA = elementIndex
        let indexB = elementIndex + direction
        if (elementIndex === array.length - 1 && direction == 1) {
            indexB = 0
        } else if (elementIndex === 0 && direction === -1) (
            indexB = array.length - 1
        )


        // Store the values of the two elements.
        const temp = array[indexA]
        const value1 = array[indexB]

        // Swap the values of the two elements.
        array[indexA] = value1
        array[indexB] = temp
    }

}