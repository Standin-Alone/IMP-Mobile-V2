
import React from "react";
import { View,Text } from "react-native";
import { styles } from "./styles";
import NumberFormat from 'react-number-format';
export const AmountText = ({
  
    value,
    amountStyle

})=>(   
    <NumberFormat
        value={value}
        displayType={'text'}
        decimalScale={2}
        fixedDecimalScale={true}
        thousandSeparator={true}
        renderText={(result, props) => (


            <Text
            adjustsFontSizeToFit
            style={[styles.amount,amountStyle]}>
            ₱ {result}
            </Text>             
        
        )}
    />
);

