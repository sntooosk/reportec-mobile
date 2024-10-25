import React from 'react';
import { BellSimpleRinging, ChartBarHorizontal, CurrencyCircleDollar } from 'phosphor-react-native';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

export const Header = ({
  appName,
  iconLeft,
  textLeft,
  avatarRight,
  typeRelatorio,
  typeTransaction,
  typeNotification,
}) => {
  return (
    <View style={styles.container}>
      {iconLeft && (
        <>
          {typeRelatorio && (
            <ChartBarHorizontal
              size={32}
              weight="light"
              style={styles.iconButton}
            />
          )}
          {typeNotification && (
            <BellSimpleRinging
              size={32}
              weight="light"
              style={styles.iconButton}
            />
          )}
          {typeTransaction && (
            <CurrencyCircleDollar
              size={32}
              weight="light"
              style={styles.iconButton}
            />
          )}
        </>
      )}
      <View style={styles.contentHeader}>
        <Text style={styles.appName}>{appName}</Text>
        {textLeft && (
          <Text style={styles.status}>Ativo</Text>
        )}
      </View>
      {avatarRight && (
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/4657811?v=4' }}
          style={styles.avatar}
        />
      )}
    </View>
  );
};

// Valores padrão para as propriedades
Header.defaultProps = {
  iconLeft: false,
  textLeft: false,
  avatarRight: false,
  typeRelatorio: false,
  typeTransaction: false,
  typeNotification: false,
};
