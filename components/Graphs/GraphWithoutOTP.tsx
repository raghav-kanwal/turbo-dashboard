import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import ChartTabs from "../ChartTabs/ChartTabs";

interface Props {
    duration: string;
}

export default function GraphWithoutOTP({ duration }: Props) {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const tabs = ['With OTP', 'Consolidated', 'WithoutOTP']
    const data = [
        {
            date: "1/1/23",
            total: 40,
            successful: 10,
        },
        {
            date: "8/1/23",
            total: 20,
            successful: 3,
        },
        {
            date: "15/1/23",
            total: 80,
            successful: 15,
        },
        {
            date: "22/1/23",
            total: 100,
            successful: 40,
        },
        {
            date: "29/1/23",
            total: 45,
            successful: 10,
        },
    ];

    useEffect(() => {
        // refetch data on tab/duration change
        // show spinner, etc.
    }, [tabIndex, duration])

    return (
        <Box marginTop="2rem">
            <ChartTabs setTabIndex={setTabIndex} />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', offset: '-5' }} />
                    {/* label={{ value: 'Hits', angle: -90, position: 'left', offset: '-20' }} */}
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" align="center" />
                    <Line
                        type="monotone"
                        name="Total API Hits"
                        dataKey="total"
                        stroke="#4185F4"
                    />
                    <Line
                        type="monotone"
                        name="Successful API Hits"
                        dataKey="successful"
                        stroke="red"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}