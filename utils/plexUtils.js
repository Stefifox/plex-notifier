/**
 * Parse the incoming payload
 * @param json
 * @returns {{library: {type: *, title: *}, playerIP: *, media: {subtitle: string, type, title}, event: string | Event, user: *}}
 */
function parsePayload(json){
    const payload = JSON.parse(json)
    const event = payload.event
    const user = payload.Account
    const playerIP = payload.Player.publicAddress
    const library = {
        type: payload.Metadata.librarySectionType,
        title: payload.Metadata.librarySectionTitle
    }
    const media = {
        type: payload.Metadata.type,
        title: payload.Metadata.title,
        subtitle: payload.Metadata.subtype
    }

    return {
        event,
        user,
        playerIP,
        library,
        media
    }

}

module.exports ={
    parsePayload
}