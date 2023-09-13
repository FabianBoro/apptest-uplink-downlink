import React, { Component } from 'react';
import mqtt from 'mqtt';

class MQTTDataDisplay extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }
  
  handleSendDownlink = () => {
    // Mengirim permintaan ke endpoint API untuk pesan downlink
    axios.post('/send-downlink', { message: 'Pesan yang akan dikirim ke perangkat' })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    // Kode untuk koneksi ke broker MQTT dan menghandle pesan
    // ...
    // Contoh penggunaan this.setState untuk mengupdate state
    // this.setState({ data: 'Data baru yang akan ditampilkan' });

    // Buat koneksi ke broker MQTT
    const client = mqtt.connect('mqtt://192.168.201.155:1883');

    // Subscribe ke topik yang sesuai
    client.subscribe('application/+/device/+/event/+');

    // Tangani pesan yang diterima dari broker
    client.on('message', (topic, message) => {
      // Ubah pesan JSON menjadi objek JavaScript
      const data = JSON.parse(message.toString());

      // Update state dengan data yang diterima
      this.setState({ data });
    });

  }

  render() {
    const { data } = this.state;

    return (
        <div>
        <h2>Data dari MQTT Broker</h2>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        <button onClick={this.handleSendDownlink}>Kirim Pesan Downlink</button>
      </div>
    );
  }
}

export default MQTTDataDisplay;
 
