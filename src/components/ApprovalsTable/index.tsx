import { fetchTokens } from "@/utils/functions/fetchTokens";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "../CopyButton";
import { useTranslation } from "react-i18next";
import { Action } from "./Actions";

export const ApprovalsTable = () => {
  const { address: connectedAddress } = useAccount();
  const [tokensData, setTokensData] = useState<Asset[]>([]);

  const fetchApprovals = useCallback(async () => {
    const data = (await fetchTokens(connectedAddress!)) as Asset[];
    setTokensData(data);
  }, [connectedAddress]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  return (
    <div className="p-6">
      <DataTableDemo fetchApprovals={fetchApprovals} data={tokensData} />
    </div>
  );
};

type Asset = {
  asset: string;
  network: string;
  type: string;
  totalAmount: string;
  approvedAmount: string;
  tokenAddress: `0x${string}`;
  authorizedSpenders: `0x${string}`[];
  blockExplorer?: string;
};

export function DataTableDemo({
  data,
  fetchApprovals,
}: {
  data: Asset[];
  fetchApprovals(): void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { t } = useTranslation();

  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "asset",
      header: t("table.dropdown.asset"),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("asset")}</div>
      ),
    },
    {
      accessorKey: "network",
      header: t("table.dropdown.network"),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("network")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: t("table.dropdown.type"),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: () => <div>{t("table.dropdown.totalAmount")}</div>,
      cell: ({ row }) => {
        const totalAmount = parseFloat(row.getValue("totalAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalAmount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "approvedAmount",
      header: t("table.dropdown.approvedAmount"),
      cell: ({ row }) => {
        const approvedAmount = parseFloat(row.getValue("approvedAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(approvedAmount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "tokenAddress",
      header: () => (
        <div className="text-right">{t("table.dropdown.tokenAddress")}</div>
      ),
      cell: ({ row }) => (
        <div className="lowercase text-right">
          {`${(row.getValue("tokenAddress") as string).substring(0, 8)}...${(
            row.getValue("tokenAddress") as string
          ).substring((row.getValue("tokenAddress") as string).length - 8)}`}
          <span className="w-2 inline-block" />
          <CopyButton value={row.getValue("tokenAddress")} />
        </div>
      ),
    },
    {
      accessorKey: "authorizedSpenders",
      header: () => (
        <div className="text-right">
          {t("table.dropdown.authorizedSpenders")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="lowercase text-right grid">
          <div className="flex flex-col">
            {(row.getValue("authorizedSpenders") as string[]).length
              ? (row.getValue("authorizedSpenders") as string[]).map(
                  (spender) => (
                    <div className="flex-1 block">
                      {`${spender.substring(0, 8)}...${spender.substring(
                        spender.length - 8
                      )}`}
                      <span className="w-2 inline-block" />
                      <CopyButton value={spender} />
                    </div>
                  )
                )
              : "N/A"}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const asset = row.original;
        return <Action asset={asset} fetchApprovals={fetchApprovals} />;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={t("table.input-filter")}
          value={(table.getColumn("asset")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("asset")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t("table.dropdown.columns")}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {t(`table.dropdown.${column.id}`)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("table.previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("table.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
