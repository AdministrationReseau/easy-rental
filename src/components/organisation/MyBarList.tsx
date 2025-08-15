import { BarList } from '@/components/BarList';

export interface MyBarListDataItem {
    id: number
    name: string
    value: number
    amount: number
    href: string
}

interface MyBarListProps {
    data: MyBarListDataItem[]
}

export const MyBarList = ({data}: MyBarListProps) => (
    <BarList data={data} valueFormatter={(value, amount) => `${value} Location${value > 1 ? 's' : '' } (${Intl.NumberFormat("fr-CM").format(amount)} XAF)`} />
)