
$(document).ready(function () {
    $.get("http://orderpcb.vn/getcf/all", function (data, status) {

        console.log(data);
        
        $('#hotline').html('Hotline : ' + data['hotline']);
        $("#fb").html(data['fb']);
        $('#logo').html(data['logo']);
        $('#save_money').html(data['save_money']);

        let day = 'Ngày gộp đơn : ';

        if (data['day0'] != null) {
            day += 'Chủ nhật | ';
        }

        if (data['day1'] != null) {
            day += 'Thứ 2 | ';
        }

        if (data['day2'] != null) {
            day += 'Thứ 3 |';
        }

        if (data['day3'] != null) {
            day += 'Thứ 4 |';
        }

        if (data['day4'] != null) {
            day += 'Thứ 5 |';
        }

        if (data['day5'] != null) {
            day += 'Thứ 6 |';
        }

        if (data['day6'] != null) {
            day += 'Thứ 7 |';
        }

        $('#order_days').html(day);

    });
});
