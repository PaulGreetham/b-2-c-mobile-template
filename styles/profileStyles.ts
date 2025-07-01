import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContent: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 4,
  },
  nameDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  actionButtons: {
    flex: 1,
    paddingTop: 30,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 16,
  },
  pendingEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  pendingEmailText: {
    color: '#6B7280',
    fontSize: 12,
  },
  cancelPendingButton: {
    padding: 4,
  },
  refreshButton: {
    padding: 4,
  },
}); 