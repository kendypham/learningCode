import { Component, Input, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { Analyst } from 'src/app/shared/models/analyst';
import { AnalystService } from 'src/app/shared/services/analyst.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { DashboardService } from "../../../../shared/services/dashboard.service";

@Component({
    templateUrl: 'analyst.component.html',
    styleUrls: ['./analyst.component.scss'],
})
export class AnalystComponent implements OnInit {
    isInit = true;
    orders: number = 0
    shipping: number = 0
    totalIncome: number = 0
    membersOnline: number = 0
    maxH = 250;
    currentOrders = []
    topSales = []
    _provider: Analyst;
    get dataProvider() {
        return this._provider
    }
    @Input() set dataProvider(val: any) {
        this._provider = val;
        this.resetData()
    }

    /* tslint:disable:max-line-length */
    mainChartLabels: Array<any> = [];
    /* tslint:enable:max-line-length */
    mainChartOptions: any = {
        tooltips: {
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                // ticks: {
                //     callback: function (value: any) {
                //         return value.charAt(0);
                //     }
                // }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    mainChartColours: Array<any> = [
        { // brandInfo
            backgroundColor: hexToRgba(getStyle('--info'), 10),
            borderColor: getStyle('--info'),
            pointHoverBackgroundColor: '#fff'
        },
        { // brandSuccess
            backgroundColor: 'transparent',
            borderColor: getStyle('--success'),
            pointHoverBackgroundColor: '#fff'
        },
        { // brandDanger
            backgroundColor: 'transparent',
            borderColor: getStyle('--danger'),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        },
        { // brandDanger
            backgroundColor: 'transparent',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5],
            borderColor: 'rgb(103, 58, 183)',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: '#fff',
            pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
        }
    ];
    mainChartLegend = false;
    mainChartType = 'line';
    radioModel: string = 'Month';
    // mainChart

    mainChartElements = 6;
    phoneSum: number = 0
    laptopSum: number = 0
    tabletSum: number = 0
    otherSum: number = 0
    phoneData: Array<number> = [];
    laptopData: Array<number> = [];
    tabletData: Array<number> = [];
    otherData: Array<number> = [];

    mainChartData: Array<any> = [
        {
            data: this.phoneData,
            label: 'Phone'
        },
        {
            data: this.laptopData,
            label: 'Laptop'
        },
        {
            data: this.tabletData,
            label: 'Tablet'
        },
        {
            data: this.otherData,
            label: 'Others'
        }
    ];

    constructor(
        private analystService: AnalystService,
        private toastService: ToastrService,
        public dashboardService: DashboardService,
        private socketService: SocketService,
    ) {

    }
    ngOnInit(): void {
        this.isInit = false
        // this.dashboardService.title = 'Analyst'
        // generate random values for mainChart
        this.analystService.get()
            .subscribe(data => {
                this.dataProvider = data;
            }, (err) => {
                console.log("error", err);
                this.toastService.error('Error while fetching data', err);
            });

        this.socketService.getUserCount().subscribe((res) => {
            if (String(res)) {
                this.membersOnline = res;
                console.log(this.membersOnline);
            }
            console.log(res);
        });
    }

    resetData = () => {
        this.mainChartLabels = []
        this.orders = this._provider.orderCount
        this.shipping = this._provider.shippingCount
        this.totalIncome = this._provider.totalIncome
        this.currentOrders = this._provider.currentOrders
        this.topSales = this._provider.topSales

        for (let i = 5; i >= 0; i--) {
            this.phoneData.push(this._provider.chart.phoneList[i].value);
            this.laptopData.push(this._provider.chart.laptopList[i].value);
            this.tabletData.push(this._provider.chart.tabletList[i].value);
            this.otherData.push(this._provider.chart.others[i].value);

            this.phoneSum += this.phoneData[5 - i]
            this.laptopSum += this.laptopData[5 - i]
            this.tabletSum += this.tabletData[5 - i]
            this.otherSum += this.otherData[5 - i]

            this.mainChartLabels.push(this._provider.chart.phoneList[i].key)

        }
        this.maxH = this._provider.max ? this._provider.max : this.maxH
        var h = Math.ceil(this.maxH / 5 / 10) * 10
        this.mainChartOptions.scales.yAxes = [{
            ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: h,
                max: h * 5
            }
        }]
    }

    getTotalIncome = () => {
        let number: any = this.totalIncome
        if (number == 0) {
            return 0;
        }
        else {
            // hundreds
            if (number <= 999) {
                return number;
            }
            // thousands
            else if (number >= 1000 && number <= 999999) {
                return (number / 1000) + 'K';
            }
            // millions
            else if (number >= 1000000 && number <= 999999999) {
                return (number / 1000000) + 'M';
            }
            // billions
            else if (number >= 1000000000 && number <= 999999999999) {
                return (number / 1000000000) + 'B';
            }
            else
                return number;
        }
    }
}
