import { NavigationContainerComponent, NavigationActions } from "react-navigation";

export class NavigationProvider {
    static navigation: NavigationContainerComponent

    static setNavigation(navigation: NavigationContainerComponent) {
        this.navigation = navigation
        this.navigation
    }

    static navigate(routeName: string, params?: object) {
        this.navigation.dispatch(
            NavigationActions.navigate({
                routeName,
                params
            })
        )
    }

    static goBack() {
        this.navigation.dispatch(
            NavigationActions.back()
        )
    }
}