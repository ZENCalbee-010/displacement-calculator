// ===== ตัวแปรส่วนกลาง =====
let chart;

// ===== ฟังก์ชันหลัก: รับข้อมูลและคำนวณ =====
document.getElementById("inputForm").addEventListener("submit", function(event) {
  // ป้องกันการรีเฟรชหน้า
  event.preventDefault();

  // ===== ขั้นตอนที่ 1: รับค่าจากฟอร์ม =====
  let u = Number(document.getElementById("u").value);
  let a = Number(document.getElementById("a").value);
  let t = Number(document.getElementById("t").value);
  let samples = Number(document.getElementById("samples").value);

  // ===== ขั้นตอนที่ 2: คำนวณการกระจัดที่เวลา t =====
  let displacement = u * t + 0.5 * a * t * t;
  document.getElementById("displacement").value = displacement;

  // ===== ขั้นตอนที่ 3: สร้างข้อมูลสำหรับกราฟ =====
  let data = [];
  let totalTime = t * 2;

  // คำนวณข้อมูลตั้งแต่เวลา 0 ถึง 2t
  for (let i = 0; i <= samples; i++) {
    let time = (totalTime / samples) * i;
    let s = u * time + 0.5 * a * time * time;
    data.push({ x: time, y: s });
  }

  // ===== ขั้นตอนที่ 4: กำหนดสีสำหรับจุดข้อมูล =====
  // จุดที่ x = t จะเป็นสีแดง, ส่วนอื่นๆ เป็นสีฟ้า
  let colors = data.map(point => {
    if (Math.abs(point.x - t) < 0.0001) {
      return "red";
    } else {
      return "rgba(75,192,192,1)";
    }
  });

  // ===== ขั้นตอนที่ 5: สร้างหรืออัปเดตกราฟ =====
  let ctx = document.getElementById("myChart").getContext("2d");

  // ลบกราฟเก่าหากมีอยู่
  if (chart) {
    chart.destroy();
  }

  // สร้างกราฟใหม่
  chart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "s = ut + (1/2)at²",
        data: data,
        showLine: true,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: colors,
        pointBackgroundColor: colors,
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        x: {
          type: "linear",
          title: { display: true, text: "Time (t)" }
        },
        y: {
          title: { display: true, text: "Displacement (s)" }
        }
      }
    }
  });

});
