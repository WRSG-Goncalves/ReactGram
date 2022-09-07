export interface ActionButtonProps {
    onPress?: () => void
    type?: 'default' | 'danger' | 'success'
    icon?: string
}