export function calculateSeasonal() {
    const date = new Date();
    const day = date.getDate();
    let theme = 'base';

    switch (date.getMonth()) {
        case 0: // January
            break;
        case 1: // February
            break;
        case 2: // March
            break;
        case 3: // April
            break;
        case 4: // May
            break;
        case 5: // June
            break;
        case 6: // July
            if (day >= 0 && day <= 13) {
                theme = 'america'
            }
            break;
        case 7: // August
            if (day == 31) {
                theme = 'labour'
            }
            break;
        case 8: // September
            if (day >= 0 && day <= 3) {
                theme = 'labour'
            }
            break;
        case 9: // October
            break;
        case 10: // November
            break;
        case 11: // December
            break;

        default:
            break;
    }

    return theme;
}