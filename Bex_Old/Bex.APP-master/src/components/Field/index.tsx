import React, { FunctionComponent } from 'react'
import { Field as FormField } from 'rc-field-form'
import { FieldProps } from 'rc-field-form/lib/Field'
import { View } from 'react-native'
import Error from './Error'

const Field: FunctionComponent<{
    label?: string    
} & FieldProps> = ({ children, label, ...props }) => {
    return (
        <FormField messageVariables={{label}} trigger="onChangeText" getValueFromEvent={text => text} {...props}>
            {
                (control, meta) => {
                    return <View>
                        {
                            React.cloneElement(children as any, { error: meta.errors.length > 0, ...control, ...props })
                        }
                        {
                            meta.errors.map((error, index) => (
                                <Error key={index}>
                                    {error}
                                </Error>
                            ))
                        }
                        {
                            meta.errors.length === 0 ? (
                                <Error>

                                </Error>
                            ) : null
                        }
                    </View>
                }
            }
        </FormField>
    )
}

export default Field