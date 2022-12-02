import { Flex, Box, Text } from "@chakra-ui/react";

interface OrderSummaryProps {
    mode: string | undefined
}
export default function OrderSummary(props: OrderSummaryProps) {
    const contentFontSize = props.mode === 'sm' ? `sm` : `md`;
    
    return (
        <Box justifyContent="space-between" flexDir="column">
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Subtotal</Text>
                <Text as="span" className="value" fontSize={contentFontSize} justifyContent={'flex-end'}>Rs. 3,298</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Coupon Discount</Text>
                <Text as="span" className="value" fontSize={contentFontSize}>Rs. 0</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Shipping Fee</Text>
                <Text as="span" className="value" fontSize={contentFontSize}>Rs. 0</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Grand Total</Text>
                <Text as="strong" className="value" fontSize={contentFontSize}>Rs. 3,298</Text>
            </Flex>
        </Box>
    )
}