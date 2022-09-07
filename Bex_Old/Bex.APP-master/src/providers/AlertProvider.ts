type AlertType = 'info' | 'warn' | 'error' | 'success'

export type DropdownType = {
    alertWithType: (type: AlertType, title: string, message: string, payload?: any, interval?: number) => void
}

export class AlertProvider {
    static dropDown: DropdownType

    static setDropDown(dropDown: DropdownType) {
        this.dropDown = dropDown
    }

    static alert(type: AlertType, title: string, message: string) {
        this.dropDown.alertWithType(type, title, message)
    }

    static success(title: string, message: string = '') {
        this.dropDown.alertWithType('success', title, message)
    }

    static error(title: string, message: string = '') {
        this.dropDown.alertWithType('error', title, message, null, 0)
    }

    static warn(title: string, message: string = '') {
        this.dropDown.alertWithType('warn', title, message)
    }

    static info(title: string, message: string = '') {
        this.dropDown.alertWithType('info', title, message)
    }
}