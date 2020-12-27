import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';
import { set } from 'react-native-reanimated';

export default function Incidents() {

    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [totalIncidentsNumber, setTotalIncidentsNumber] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        loadIncidents();
    }, []);

    useEffect(() => {
        if (page === 1) {
            setIncidents([]);
        }
    }, [page]);

    useEffect(() => {
        if (incidents.length === 0) {
            loadIncidents();
        }
    }, [incidents])


    async function loadIncidents() {

        if (loading){
            return;
        }

        if (totalIncidentsNumber > 0 && incidents.length === totalIncidentsNumber){
            return;
        }

        setLoading(true);

        try{
            const response = await api.get(`/incidents?page=${page}`);

            setIncidents([...incidents, ...response.data]);

            setTotalIncidentsNumber(response.headers['x-total-count']);

            setPage(page + 1);
            setLoading(false);
            setRefreshing(false);
        } catch (err) {
            console.log('Erro na requisição');
            setLoading(false);
            setRefreshing(false);
        }
    }

    function handleRefresh() {
        setRefreshing(true);
        setPage(1);
    }

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }
  
    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIncidentsNumber} casos</Text>.
                </Text>

            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text 
                            style={styles.incidentValue}
                        >
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailButton} 
                            onPress={() => {navigateToDetail(incident)}}
                        >
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041'/>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}