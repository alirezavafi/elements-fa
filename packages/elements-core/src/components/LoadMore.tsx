import { Button, Flex, Text } from '@stoplight/mosaic';
import * as React from 'react';

interface LoadMoreProps {
  loading: boolean;
  onClick: () => void;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ loading, onClick }) => {
  return (
    <Flex flexDirection="col" justifyContent="center" alignItems="center" style={{ height: '400px' }}>
      <Button aria-label="load-example" onPress={onClick} appearance="minimal" loading={loading} disabled={loading}>
        {loading ? 'در حال بارگزاری...' : 'بارگزاری مثالها'}
      </Button>
      <Text fontSize="base" textAlign="center">
        پاسخ های حجیم سرور بصورت پیشفرض نمایش داده نمی شوند.
      </Text>
    </Flex>
  );
};
