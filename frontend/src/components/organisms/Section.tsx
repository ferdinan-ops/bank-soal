import * as React from 'react'
import { useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { Form, FormField, FormItem } from '../ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

import More from '../atoms/More'
import { Loading, Search } from '../atoms'

interface SectionProps {
  children?: React.ReactNode
  className?: string
}

export default function Section({ children, className, isLoading }: SectionProps & { isLoading?: boolean }) {
  return (
    <React.Fragment>
      {isLoading && <Loading />}
      <section className={cn(className)}>{children}</section>
    </React.Fragment>
  )
}

interface HeadProps extends SectionProps {
  title: string
  desc: string
}

function Head({ className, children, title, desc }: HeadProps) {
  return (
    <div className={cn('flex md:items-center md:justify-between flex-col md:flex-row gap-5 md:gap-0', className)}>
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">{title}</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">{desc}</p>
      </div>
      {children}
    </div>
  )
}

interface FormFields {
  search: string
}

interface SearchBarProps {
  onSearch: (data: FormFields) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  const forms = useForm<FormFields>()

  return (
    <Form {...forms}>
      <form onSubmit={forms.handleSubmit(onSearch)} className="ml-auto flex w-4/12 items-center">
        <FormField
          name="search"
          control={forms.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <Search {...field} value={field.value ?? ''} placeholder="Cari siswa" containerClassName="w-full" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function Body({ children, className }: SectionProps) {
  return (
    <div className={cn('mt-3 rounded-2xl bg-[#F7F9FB] p-3 dark:bg-white/5 md:mt-6 md:p-6 xl:col-span-3', className)}>
      {children}
    </div>
  )
}

interface TableMainProps extends SectionProps {
  headers: string[]
  dataLength: number
}

function TableMain({ headers, dataLength, children }: TableMainProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dataLength === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
              Tidak ada data
            </TableCell>
          </TableRow>
        ) : null}

        {children}
      </TableBody>
    </Table>
  )
}

interface RowProps extends SectionProps {
  details: {
    type: 'edit' | 'delete' | 'detail'
    label?: string
    onClick: () => void
  }[]
}

function Row({ children, className, details }: RowProps) {
  return (
    <TableRow className={cn(className)}>
      {children}
      <TableCell position="center">
        <More type="settings">
          {details.map((detail, index) => (
            <More.Item key={index} {...detail} />
          ))}
        </More>
      </TableCell>
    </TableRow>
  )
}

function Cell({ children, className }: SectionProps) {
  return <TableCell className={cn(className)}>{children}</TableCell>
}

Section.Head = Head
Section.Search = SearchBar
Section.Body = Body
Section.Table = TableMain
Section.Row = Row
Section.Cell = Cell
