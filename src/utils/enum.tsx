/* Represents the states of a process.
 * Used to track the current status of a workflow / operation.
*/
export enum ProcessState {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    CANCELED = 'Canceled',
}