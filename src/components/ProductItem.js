import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../constants';

const ProductItem = ({ item, onEdit, onDelete }) => {
  const isExpiringSoon = item.days_until_expiry <= 3;
  const isExpired = item.days_until_expiry <= 0;

  return (
    <View style={styles.itemBox}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.buy_name}</Text>
        <Text style={styles.itemDetail}>수량: {item.buy_cnt}</Text>
        <Text style={styles.itemDetail}>유통기한: {item.expire_date}</Text>
        <View>
          <Text style={styles.itemDetail}>
            보관 :
            <Text
              style={[
                styles.normalText,
                isExpiringSoon && styles.expireWarning,
                isExpired && styles.expiredText,
              ]}
            >
              {isExpired ? ' 만료' : isExpiringSoon ? ' 임박 ⚠️' : ' 정상'}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.itemButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.buttonText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.buy_id)}
        >
          <Text style={styles.buttonText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    marginHorizontal: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  expireWarning: {
    color: colors.RED_500,
    fontWeight: '700',
  },
  itemButtons: {
    justifyContent: 'space-around',
    marginLeft: 12,
  },
  editButton: {
    backgroundColor: '#e0f7f5',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 6,
  },
  deleteButton: {
    backgroundColor: '#ffecec',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 13,
  },
  normalText: {
    fontSize: 14,
    marginTop: 2,
    color: colors.MINT,
  },
  expiredText: {
    color: '#999',
    fontWeight: '700',
    textDecorationLine: 'line-through',
  },
});

export default ProductItem;
