import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingTaskDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingTaskDetailPage;
