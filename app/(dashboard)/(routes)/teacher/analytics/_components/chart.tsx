'use client'

import { Card } from "@/components/ui/card"
import {
   
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

interface ChartProps {
    data: {
        name: string
        total: number
    }[]
}

export const Chart = ({
    data
}: ChartProps) =>{
    return(
        <Card>
            <ResponsiveContainer height={350} width={'100%'}>
                <BarChart data={data}>
                    <XAxis 
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}   
                    tickLine={false}
                    axisLine={false}
                    />
                    <YAxis 
                    stroke="#888888"
                    fontSize={12}   
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                    />
                    <Bar 
                    dataKey="total" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}