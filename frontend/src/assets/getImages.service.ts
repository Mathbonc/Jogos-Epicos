function getProfileImage(prefix_path: string, id: number): string {
    id = id % 98;
    return `/assets/profile/${id}.jpg`;
}

function getBackgroundImage(prefix_path: string,  id: number): string {
    id = id % 19;
    return `/assets/background/${id}.jpg`;
}

function getGameImage(prefix_path: string, id: number): string {
    id = id % 13;
    return `/assets/games/${id}.jpg`;
}

export default { getProfileImage, getBackgroundImage, getGameImage };