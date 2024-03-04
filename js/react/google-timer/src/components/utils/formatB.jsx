export const formatB = ([ h, hh, m, mm, s, ss ]) => {
    const hours = Number(`${h}${hh}`);
    const minutes = Number(`${m}${mm}`);
    const seconds = Number(`${s}${ss}`);

    const secondsRemainder = seconds % 60;
    const minutesRemainder = (minutes + secondsRemainder) % 60;

    const readjustedMins = minutes >= 60 ? minutes - 60 : minutes;
    const readjustedSeconds = seconds >= 60 ? seconds - 60 : seconds;

    console.log( 'readjustedMins: ' + readjustedMins)
    console.log( 'readjustedSeconds: ' + readjustedSeconds)

    if ( hours + minutesRemainder )
    {
        return `${hours + minutesRemainder}h ${minutes + secondsRemainder}m ${seconds - secondsRemainder}s`
    }

    if ( minutes + secondsRemainder )
    {
        return `${minutes + secondsRemainder}m ${seconds - secondsRemainder}`
    }

    return `${seconds}s`
}